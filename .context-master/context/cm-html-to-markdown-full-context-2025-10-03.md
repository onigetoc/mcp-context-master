================
CODE SNIPPETS
================
TITLE: Install League HTML To Markdown via Composer
DESCRIPTION: Installs the League HTML To Markdown library as a dependency in your PHP project using the Composer package manager.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_0

LANGUAGE: bash 
CODE: 
```
composer require league/html-to-markdown
```

--------------------------------

TITLE: Using Custom Environment Object with HtmlConverter - PHP
DESCRIPTION: Demonstrates how to pass a custom Environment object to the HtmlConverter constructor. This allows for advanced configuration, such as adding custom converters or setting options on the environment itself before passing it to the converter. The example creates an environment and adds a HeaderConverter.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_11

LANGUAGE: PHP
CODE:
```
$environment = new Environment(array(
    // your configuration here
));
$environment->addConverter(new HeaderConverter()); // optionally - add converter manually

$converter = new HtmlConverter($environment);

$html = '<h3>Header</h3>
<img src="" />
';
$markdown = $converter->convert($html); // $markdown now contains "### Header" and "<img src=\"\" />"
```

--------------------------------

TITLE: Initializing HtmlConverter with strip_tags Option - PHP
DESCRIPTION: Initializes the HtmlConverter with the 'strip_tags' option set to true via the constructor array. This configuration removes HTML tags that lack Markdown equivalents while keeping their content. The example demonstrates converting a <span> tag, resulting in only the content being preserved.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_2

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter(array('strip_tags' => true));

$html = '<span>Turnips!</span>';
$markdown = $converter->convert($html); // $markdown now contains "Turnips!"
```

--------------------------------

TITLE: Stripping Placeholder Links in HtmlConverter - PHP
DESCRIPTION: Initializes the HtmlConverter with the 'strip_placeholder_links' option set to true. By default, placeholder links (like <a href="url">url</a>) are preserved. This option removes them, leaving only the link text. The example shows converting a simple <a> tag.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_7

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter(array('strip_placeholder_links' => true));

$html = '<a>Github</a>';
$markdown = $converter->convert($html); // $markdown now contains "Github"
```

--------------------------------

TITLE: Controlling Autolink Conversion in HtmlConverter - PHP
DESCRIPTION: Demonstrates using the 'use_autolinks' option to control how <a> tags with the URL as text are converted. Setting it to true uses the simpler <url> syntax, while setting it to false (default) uses the full [url](url) syntax. The example shows both cases.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_10

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter();
$html = '<p><a href="https://thephpleague.com">https://thephpleague.com</a></p>';

$converter->getConfig()->setOption('use_autolinks', true);
$markdown = $converter->convert($html); // $markdown now contains "<https://thephpleague.com>"

$converter->getConfig()->setOption('use_autolinks', false); // default
$markdown = $converter->convert($html); // $markdown now contains "[https://thephpleague.com](https://thephpleague.com)"
```

--------------------------------

TITLE: Customizing Bold and Italic Styles in HtmlConverter - PHP
DESCRIPTION: Initializes the HtmlConverter and sets the 'italic_style' and 'bold_style' options using getConfig()->setOption(). This allows changing the Markdown syntax used for bold (<strong>) and italic (<em>) tags from the default. The example sets italic to '*' and bold to '__'.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_8

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter();
$converter->getConfig()->setOption('italic_style', '*');
$converter->getConfig()->setOption('bold_style', '__');

$html = '<em>Italic</em> and a <strong>bold</strong>';
$markdown = $converter->convert($html); // $markdown now contains "*Italic* and a __bold__"
```

--------------------------------

TITLE: Preserving All HTML Comments in HtmlConverter - PHP
DESCRIPTION: Initializes the HtmlConverter with the 'preserve_comments' option set to true. By default, comments are stripped, but this option keeps all HTML comments in the output Markdown. The example shows converting HTML containing a comment, which is retained in the result.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_5

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter(array('preserve_comments' => true));

$html = '<span>Turnips!</span><!-- Monkeys! -->';
$markdown = $converter->convert($html); // $markdown now contains "Turnips!<!-- Monkeys! -->"
```

--------------------------------

TITLE: Preserving Specific HTML Comments in HtmlConverter - PHP
DESCRIPTION: Initializes the HtmlConverter with the 'preserve_comments' option set to an array of strings. Only comments whose content exactly matches one of the strings in the array will be preserved. The example shows converting HTML with two comments, but only the one matching 'Eggs!' is kept.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_6

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter(array('preserve_comments' => array('Eggs!')));

$html = '<span>Turnips!</span><!-- Monkeys! --><!-- Eggs! -->';
$markdown = $converter->convert($html); // $markdown now contains "Turnips!<!-- Eggs! -->"
```

--------------------------------

TITLE: Setting strip_tags Option on HtmlConverter Config - PHP
DESCRIPTION: Initializes the HtmlConverter and then sets the 'strip_tags' option to true using the getConfig()->setOption() method. This achieves the same result as setting it in the constructor, removing HTML tags without Markdown equivalents while preserving content. The example shows converting a <span> tag.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_3

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter();
$converter->getConfig()->setOption('strip_tags', true);

$html = '<span>Turnips!</span>';
$markdown = $converter->convert($html); // $markdown now contains "Turnips!"
```

--------------------------------

TITLE: Controlling Line Break Style in HtmlConverter - PHP
DESCRIPTION: Demonstrates using the 'hard_break' option to control how <br> tags are converted. Setting it to true (GFM style) results in a single newline (\n), while setting it to false (traditional Markdown) results in two spaces followed by a newline (  \n). The example shows both cases.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_9

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter();
$html = '<p>test<br>line break</p>';

$converter->getConfig()->setOption('hard_break', true);
$markdown = $converter->convert($html); // $markdown now contains "test\nline break"

$converter->getConfig()->setOption('hard_break', false); // default
$markdown = $converter->convert($html); // $markdown now contains "test  \nline break"
```

--------------------------------

TITLE: Configuring HtmlConverter to Remove Specific Nodes - PHP
DESCRIPTION: Initializes the HtmlConverter with the 'remove_nodes' option set to a space-separated string of tag names (e.g., 'span div'). This configuration removes the specified HTML tags *and* their content. The example demonstrates converting HTML with <span> and <div> tags, resulting in an empty string.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_4

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter(array('remove_nodes' => 'span div'));

$html = '<span>Turnips!</span><div>Monkeys!</div>';
$markdown = $converter->convert($html); // $markdown now contains ""
```

--------------------------------

TITLE: Running PHPUnit Tests
DESCRIPTION: This command executes the project's test suite using PHPUnit via the vendor binary. It is used to verify that code changes do not introduce regressions and meet the required test coverage.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/CONTRIBUTING.md#_snippet_0

LANGUAGE: bash
CODE:
```
$ ./vendor/bin/phpunit
```

--------------------------------

TITLE: Setting ATX Header Style for HtmlConverter in PHP
DESCRIPTION: Shows how to instantiate the HtmlConverter with an options array to set the 'header_style' to 'atx', which changes the output format for H1 and H2 headers from Setext (underlined) to ATX (# Header).

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_13

LANGUAGE: PHP
CODE:
```
$converter = new HtmlConverter(array('header_style'=>'atx'));
```

--------------------------------

TITLE: Convert HTML to Markdown using HtmlConverter
DESCRIPTION: Demonstrates how to instantiate the HtmlConverter class and use its convert() method to transform an HTML string into a Markdown string.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_1

LANGUAGE: php
CODE:
```
use League\\HTMLToMarkdown\\HtmlConverter;\n\n$converter = new HtmlConverter();\n\n$html = "<h3>Quick, to the Batpoles!</h3>";\n$markdown = $converter->convert($html);
```

--------------------------------

TITLE: Adding Table Support to HtmlConverter in PHP
DESCRIPTION: Demonstrates how to explicitly add the TableConverter to the HtmlConverter environment to enable support for converting HTML tables into Markdown format. This is required as table support is not enabled by default.

SOURCE: https://github.com/thephpleague/html-to-markdown/blob/master/README.md#_snippet_12

LANGUAGE: PHP
CODE:
```
use League\HTMLToMarkdown\HtmlConverter;
use League\HTMLToMarkdown\Converter\TableConverter;

$converter = new HtmlConverter();
$converter->getEnvironment()->addConverter(new TableConverter());

$html = "<table><tr><th>A</th></tr><tr><td>a</td></tr></table>";
$markdown = $converter->convert($html);
```