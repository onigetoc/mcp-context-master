import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { debugLog } from './logger.js';

export interface RetryConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

export interface NetworkErrorInfo {
  type: 'timeout' | 'not_found' | 'rate_limit' | 'network' | 'server' | 'unknown';
  message: string;
  retryable: boolean;
  statusCode?: number;
}

/**
 * Analyzes an error and returns structured information about it
 */
export function analyzeNetworkError(error: any): NetworkErrorInfo {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Timeout errors
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return {
        type: 'timeout',
        message: 'Request timed out. The server took too long to respond.',
        retryable: true
      };
    }
    
    // Network errors (DNS, connection refused, etc.)
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ENETUNREACH') {
      return {
        type: 'network',
        message: 'Network error. Please check your internet connection.',
        retryable: true
      };
    }
    
    // HTTP status errors
    if (axiosError.response) {
      const status = axiosError.response.status;
      
      if (status === 404) {
        return {
          type: 'not_found',
          message: 'Resource not found (404). The library may not be available on Context7.',
          retryable: false,
          statusCode: 404
        };
      }
      
      if (status === 429) {
        return {
          type: 'rate_limit',
          message: 'Rate limit exceeded (429). Too many requests.',
          retryable: true,
          statusCode: 429
        };
      }
      
      if (status >= 500) {
        return {
          type: 'server',
          message: `Server error (${status}). The remote server encountered an issue.`,
          retryable: true,
          statusCode: status
        };
      }
    }
  }
  
  return {
    type: 'unknown',
    message: error instanceof Error ? error.message : String(error),
    retryable: false
  };
}

/**
 * Downloads content with automatic retry logic and exponential backoff
 */
export async function downloadWithRetry(
  url: string,
  config: AxiosRequestConfig = {},
  retryConfig: RetryConfig = {}
): Promise<any> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2
  } = retryConfig;

  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      debugLog(`📥 Download attempt ${attempt}/${maxRetries}: ${url}`);
      
      const response = await axios.get(url, {
        timeout: 30000,
        headers: {
          'User-Agent': 'MCP-Context-Master/1.0.0',
          ...config.headers
        },
        ...config
      });
      
      debugLog(`✅ Download successful on attempt ${attempt}`);
      return response;
      
    } catch (error) {
      lastError = error;
      const errorInfo = analyzeNetworkError(error);
      const isLastAttempt = attempt === maxRetries;
      
      debugLog(`❌ Attempt ${attempt} failed: ${errorInfo.message}`);
      
      // Don't retry if error is not retryable
      if (!errorInfo.retryable) {
        debugLog(`⚠️  Error is not retryable, aborting.`);
        throw error;
      }
      
      // Don't retry on last attempt
      if (isLastAttempt) {
        debugLog(`⚠️  Max retries reached, giving up.`);
        throw error;
      }
      
      // Calculate delay with exponential backoff
      let delay = initialDelay * Math.pow(backoffMultiplier, attempt - 1);
      
      // Special case: rate limiting (wait longer)
      if (errorInfo.type === 'rate_limit') {
        delay = Math.max(delay, 60000); // At least 60s for rate limits
      }
      
      // Cap the delay
      delay = Math.min(delay, maxDelay);
      
      debugLog(`⏳ Waiting ${delay}ms before retry ${attempt + 1}...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * Validates if a Context7 URL is accessible (quick HEAD request)
 */
export async function validateContext7Url(url: string): Promise<boolean> {
  try {
    debugLog(`🔍 Validating Context7 URL: ${url}`);
    
    const response = await axios.head(url, {
      timeout: 5000,
      validateStatus: (status) => status < 500,
      headers: {
        'User-Agent': 'MCP-Context-Master/1.0.0'
      }
    });
    
    if (response.status === 404) {
      debugLog(`❌ Context7 validation failed: 404 Not Found`);
      return false;
    }
    
    if (response.status >= 200 && response.status < 300) {
      debugLog(`✅ Context7 validation successful`);
      return true;
    }
    
    debugLog(`⚠️  Context7 validation uncertain: status ${response.status}`);
    return true; // Assume valid for non-404 responses
    
  } catch (error) {
    const errorInfo = analyzeNetworkError(error);
    
    // 404 means definitely not available
    if (errorInfo.type === 'not_found') {
      return false;
    }
    
    // For other errors, assume it might be available (network issues, etc.)
    debugLog(`⚠️  Validation inconclusive: ${errorInfo.message}`);
    return true;
  }
}

/**
 * Checks if the downloaded content is valid (not an error page)
 */
export function isValidContext7Content(content: string): boolean {
  // Check for common error messages in Context7 responses
  const errorPatterns = [
    /library.*not found/i,
    /you can add it at context7\.com/i,
    /404.*not found/i,
    /repository.*not found/i
  ];
  
  for (const pattern of errorPatterns) {
    if (pattern.test(content)) {
      return false;
    }
  }
  
  // Valid content should have reasonable length
  if (content.length < 100) {
    return false;
  }
  
  return true;
}
