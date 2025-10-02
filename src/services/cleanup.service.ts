import * as fs from 'fs/promises';
import * as path from 'path';
import { debugLog } from '../utils/logger.js';

export class CleanupService {
    
    /**
     * Supprime les anciens fichiers de contexte avec des dates antérieures pour une bibliothèque donnée
     * @param docsPath - Chemin vers le dossier .context-master/context
     * @param libraryName - Nom de la bibliothèque (après nettoyage des caractères spéciaux)
     * @param keepLatest - Nombre de fichiers récents à conserver (par défaut 1)
     */
    public async cleanupOldContextFiles(
        docsPath: string, 
        libraryName: string, 
        keepLatest: number = 1
    ): Promise<string[]> {
        const deletedFiles: string[] = [];

        try {
            // Vérifier si le dossier existe
            const exists = await fs.access(docsPath).then(() => true).catch(() => false);
            if (!exists) {
                debugLog(`Cleanup: Directory does not exist: ${docsPath}`);
                return deletedFiles;
            }

            // Lire tous les fichiers du dossier
            const files = await fs.readdir(docsPath);
            
            // Nettoyer le nom de la bibliothèque de la même façon que dans generateContextFileName
            const cleanLibraryName = this.cleanLibraryName(libraryName);
            
            // Filtrer les fichiers qui correspondent à cette bibliothèque
            const libraryFiles = files.filter(file => {
                return file.startsWith(`cm-${cleanLibraryName}-`) && file.endsWith('.md');
            });

            debugLog(`Cleanup: Found ${libraryFiles.length} files for library: ${cleanLibraryName}`);

            if (libraryFiles.length <= keepLatest) {
                debugLog(`Cleanup: Keeping all ${libraryFiles.length} files (within limit of ${keepLatest})`);
                return deletedFiles;
            }

            // Trier les fichiers par date (extraction de la date depuis le nom de fichier)
            const filesWithDates = libraryFiles.map(file => {
                const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})\.md$/);
                const dateStr = dateMatch ? dateMatch[1] : '1970-01-01';
                return {
                    filename: file,
                    date: new Date(dateStr),
                    dateStr: dateStr
                };
            }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Plus récent d'abord

            // Supprimer les fichiers anciens (garder seulement les `keepLatest` plus récents)
            const filesToDelete = filesWithDates.slice(keepLatest);
            
            for (const fileInfo of filesToDelete) {
                try {
                    const fullPath = path.join(docsPath, fileInfo.filename);
                    await fs.unlink(fullPath);
                    deletedFiles.push(fileInfo.filename);
                    debugLog(`✓ Cleanup: Deleted old file: ${fileInfo.filename} (${fileInfo.dateStr})`);
                } catch (error) {
                    debugLog(`✗ Cleanup: Failed to delete ${fileInfo.filename}: ${error instanceof Error ? error.message : String(error)}`);
                }
            }

            if (deletedFiles.length > 0) {
                debugLog(`Cleanup: Deleted ${deletedFiles.length} old files for ${cleanLibraryName}`);
            }

        } catch (error) {
            debugLog(`✗ Cleanup failed for ${libraryName}: ${error instanceof Error ? error.message : String(error)}`);
        }

        return deletedFiles;
    }

    /**
     * Nettoie le nom de la bibliothèque de la même façon que generateContextFileName
     */
    private cleanLibraryName(libraryName: string): string {
        let cleanName = libraryName;
        cleanName = cleanName.replace('@', '').replace('/', '-');
        cleanName = cleanName.replace(/[<>:"|?*]/g, '-');
        return cleanName;
    }

    /**
     * Extrait l'identifiant unique (library + topic) d'un nom de fichier de contexte
     * pour grouper les fichiers identiques avec des dates différentes
     * @param filename - Nom du fichier (ex: cm-remotion-srt-captions-2025-10-01.md)
     * @returns Identifiant unique pour grouper les fichiers similaires
     */
    private extractContextIdentifier(filename: string): string {
        // Enlever l'extension .md
        let nameWithoutExt = filename.replace(/\.md$/, '');
        
        // Enlever la date à la fin (format: -YYYY-MM-DD)
        nameWithoutExt = nameWithoutExt.replace(/-\d{4}-\d{2}-\d{2}$/, '');
        
        // Le résultat est l'identifiant unique (library + topic)
        // Exemples:
        // cm-remotion-full-context-2025-10-01.md → cm-remotion-full-context
        // cm-remotion-srt-captions-2025-10-02.md → cm-remotion-srt-captions
        // cm-fs-extra-context-2025-09-29.md → cm-fs-extra-context
        
        return nameWithoutExt;
    }

    /**
     * Nettoie tous les anciens fichiers de contexte dans un dossier (toutes bibliothèques confondues)
     * @param docsPath - Chemin vers le dossier .context-master/context
     * @param keepLatest - Nombre de fichiers récents à conserver par bibliothèque (par défaut 1)
     */
    public async cleanupAllOldContextFiles(docsPath: string, keepLatest: number = 1): Promise<string[]> {
        const allDeletedFiles: string[] = [];

        try {
            const exists = await fs.access(docsPath).then(() => true).catch(() => false);
            if (!exists) {
                debugLog(`Cleanup: Directory does not exist: ${docsPath}`);
                return allDeletedFiles;
            }

            const files = await fs.readdir(docsPath);
            const contextFiles = files.filter(file => file.startsWith('cm-') && file.endsWith('.md'));

            // Grouper les fichiers par identifiant unique (library + topic)
            const contextGroupsMap = new Map<string, string[]>();
            
            for (const file of contextFiles) {
                // Extraire l'identifiant unique (library + topic) sans la date
                const contextId = this.extractContextIdentifier(file);
                if (!contextGroupsMap.has(contextId)) {
                    contextGroupsMap.set(contextId, []);
                }
                contextGroupsMap.get(contextId)!.push(file);
            }

            debugLog(`Cleanup: Found ${contextGroupsMap.size} different context groups to clean`);

            // Nettoyer chaque groupe de contexte (même library + même topic)
            for (const [contextId, contextFiles] of contextGroupsMap) {
                if (contextFiles.length <= keepLatest) {
                    continue;
                }

                // Trier par date et supprimer les anciens
                const filesWithDates = contextFiles.map((file: string) => {
                    const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})\.md$/);
                    const dateStr = dateMatch ? dateMatch[1] : '1970-01-01';
                    return {
                        filename: file,
                        date: new Date(dateStr),
                        dateStr: dateStr
                    };
                }).sort((a: any, b: any) => b.date.getTime() - a.date.getTime());

                const filesToDelete = filesWithDates.slice(keepLatest);

                for (const fileInfo of filesToDelete) {
                    try {
                        const fullPath = path.join(docsPath, fileInfo.filename);
                        await fs.unlink(fullPath);
                        allDeletedFiles.push(fileInfo.filename);
                        debugLog(`✓ Cleanup: Deleted old file: ${fileInfo.filename} (context: ${contextId})`);
                    } catch (error) {
                        debugLog(`✗ Cleanup: Failed to delete ${fileInfo.filename}: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
            }

            if (allDeletedFiles.length > 0) {
                debugLog(`Cleanup: Total deleted files: ${allDeletedFiles.length}`);
            }

        } catch (error) {
            debugLog(`✗ Global cleanup failed: ${error instanceof Error ? error.message : String(error)}`);
        }

        return allDeletedFiles;
    }
}