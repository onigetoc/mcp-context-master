================
CODE SNIPPETS
================
TITLE: 自动更新组件 API 文档
DESCRIPTION: 根据组件的代码和注释，自动生成或更新指定组件的 API 文档。例如，更新 date-picker 组件的 API 文档。

SOURCE: https://github.com/alibaba-fusion/next/blob/master/__wiki__/Contributing-guide.md#_snippet_5

LANGUAGE: bash
CODE:
```
npm run api date-picker
```

--------------------------------

TITLE: 按需引入 @alifd/next 组件 (手动)
DESCRIPTION: 手动按需引入 @alifd/next 的特定组件及其样式。

SOURCE: https://github.com/alibaba-fusion/next/blob/master/__wiki__/Quick-start.md#_snippet_3

LANGUAGE: javascript
CODE:
```
import Button from '@alifd/next/lib/button';
import '@alifd/next/lib/button/style';
```

--------------------------------

TITLE: Slider Custom Anchor and API Improvements
DESCRIPTION: Describes enhancements in the Slider component, including custom anchor rendering, hover-triggered sliding, and a more semantic and optimized API.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/__wiki__/0.x-到-1.x升级指南.md#_snippet_60

LANGUAGE: javascript
CODE:
```
import { Slider } from '@alifd/next';

// Example with custom anchor rendering (conceptual)
<Slider
  marks={{
    0: { label: 'Start', style: { color: 'red' } },
    100: { label: 'End', style: { color: 'blue' } },
  }}
  // Other props for API improvements and hover effects would be used here
/>
```

--------------------------------

TITLE: Nav.SubNav Component Properties
DESCRIPTION: Defines the properties for the Nav.SubNav sub-component, used for creating nested navigation menus.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/nav/__docs__/index.md#_snippet_6

LANGUAGE: APIDOC
CODE:
```
Nav.SubNav:
  icon: string | React.ReactNode
    - Custom icon.
  label: React.ReactNode
    - The content of the label.
  selectable: boolean
    - Whether the item is selectable.
    - Default: false
  children: React.ReactNode
    - Navigation items and sub-navigations.
  noIcon: boolean
    - Whether to display the icon indicating the item can be expanded; defaults to having an icon.
```

--------------------------------

TITLE: Start All Components Test Case with Browser
DESCRIPTION: Starts all component test cases with a browser, useful for debugging.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/site/en-us/contributing.md#_snippet_5

LANGUAGE: bash
CODE:
```
npm run test:head
```

--------------------------------

TITLE: 安装 @alifd/next
DESCRIPTION: 使用 npm 安装 @alifd/next 组件库。

SOURCE: https://github.com/alibaba-fusion/next/blob/master/__wiki__/Quick-start.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install @alifd/next --save
```

--------------------------------

TITLE: Autoplay Configuration
DESCRIPTION: Configure automatic rotation and its speed for components using `autoplay` and `autoplaySpeed` attributes.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/slider/__docs__/demo/autoplay/index.md#_snippet_0

LANGUAGE: en-US
CODE:
```
You can use the `autoplay` and `autoplaySpeed` attributes to set whether the component will automatically rotate and auto rotate.
```

LANGUAGE: zh-CN
CODE:
```
可以通过 `autoplay` 和 `autoplaySpeed` 属性来设置组件是否自动轮播 和 自动轮播的速度。
```

--------------------------------

TITLE: ConfigProvider API Methods
DESCRIPTION: Provides essential API methods for interacting with and managing the ConfigProvider's context and settings, including component enhancement, context retrieval, locale management, and direction control.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/config-provider/__docs__/index.md#_snippet_7

LANGUAGE: APIDOC
CODE:
```
ConfigProvider.config(Component):
  Enhances a given React component with ConfigProvider control. If the component lacks a `shouldComponentUpdate` method, one is added to support the `pure` prop.
  Example:
  Component.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.pure) {
          return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
      }
      return true;
  };

ConfigProvider.getContextProps(props, displayName):
  Retrieves context properties (prefix, locale, pure) calculated from component props and displayName. Useful for creating components outside the React tree.

ConfigProvider.getContext():
  Retrieves the current ConfigProvider context. Returns the first registered context if multiple ConfigProviders are nested.
  Returns:
    {
        prefix: string,
        locale: object,
        pure: boolean,
        warning: boolean
    }

ConfigProvider.initLocales(locales):
  Initializes all language packs. Can be used with `ConfigProvider.setLanguage` to determine the active language pack.
  Example:
  ConfigProvider.initLocales({
      'zh-cn': {},
      'en-us': {},
  });

ConfigProvider.setLanguage(language):
  Sets the active language. The `language` parameter must be a key present in the object passed to `ConfigProvider.initLocales`. Defaults to 'zh-cn'.
  Example:
  ConfigProvider.setLanguage('zh-cn');

ConfigProvider.setLocale(locale):
  Directly sets the locale object, equivalent to calling `initLocales` and `setLanguage` simultaneously.
  Example:
  ConfigProvider.setLocale({
      DatePicker: {},
      Dialog: {},
  });

ConfigProvider.setDirection(dir):
  Sets the component display direction. If 'rtl' is passed, it adds `dir="rtl"` to the root DOM node and enables RTL visual display, suitable for languages like Arabic.
  Example:
  ConfigProvider.setDirection('rtl');

ConfigProvider.getLocale():
  Retrieves the current locale object.

ConfigProvider.getLanguage():
  Retrieves the currently set language.

ConfigProvider.getDirection():
  Retrieves the currently set display direction.
```

--------------------------------

TITLE: Slider Component Properties
DESCRIPTION: Defines the configurable properties for the Alibaba Fusion Next Slider component. Includes boolean flags for fixed width and preview visibility, and a custom render preview function.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/range/__docs__/index.en-us.md#_snippet_2

LANGUAGE: APIDOC
CODE:
```
fixedWidth: boolean
  - Drag a line with fixed width. It considers `slider` as `double`, and `defaultValue` must be a interval.
  - Default: false

tooltipVisible: boolean
  - Tooltip always be visible or not.
  - Default: false

isPreview: boolean
  - Is preview or not.
  - Default: false

renderPreview: (value: RangeValueType | undefined, props: RangeProps) => React.ReactNode
  - Custom preview content.
  - Parameters:
    - _value_: The changed value
    - _props_: RangeProps
  - Returns: React.ReactNode
```

--------------------------------

TITLE: Nav FAQ: defaultOpenKeys with Asynchronous Data
DESCRIPTION: Addresses an issue where `defaultOpenKeys` might not work as expected with asynchronously loaded menu data.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/nav/__docs__/index.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
FAQ:
  Issue: `defaultOpenKeys` not working with asynchronously fetched menu data.
  Reason: `defaultXXX` series APIs in React only take effect during the initial render (componentDidMount). If menu data is fetched asynchronously, `defaultOpenKeys` will not apply to children loaded after the initial render.
  Solution: Ensure the Menu component is rendered only after the asynchronous data is available. Example: `{menuData && <Menu />}` where `menuData` is populated asynchronously.
```

--------------------------------

TITLE: ConfigProvider Global Configuration
DESCRIPTION: Demonstrates how to globally configure components using ConfigProvider.config() with default props for prefix, locale, and pure mode.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/config-provider/__docs__/index.md#_snippet_3

LANGUAGE: javascript
CODE:
```
import { ConfigProvider } from '@alifd/next';
import locale from './locale';

const { config } = ConfigProvider;

class Component extends React.Component {
    static propTypes = {
        prefix: PropTypes.string,
        locale: PropTypes.object,
        pure: PropTypes.bool,
    };

    static defaultProps = {
        prefix: 'next-',
        locale: locale,
        pure: false,
    };

    render() {
        const { prefix, locale, pure } = this.props;
        // ...
    }
}

export default config(Component);
```

--------------------------------

TITLE: Install @alifd/next using NPM
DESCRIPTION: Installs the @alifd/next library as a project dependency using npm.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/site/en-us/quick-start.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install @alifd/next --save
```

--------------------------------

TITLE: Nav.PopupItem Component Properties
DESCRIPTION: Defines the properties for the Nav.PopupItem sub-component, used for creating popup navigation items.

SOURCE: https://github.com/alibaba-fusion/next/blob/master/components/nav/__docs__/index.md#_snippet_5

LANGUAGE: APIDOC
CODE:
```
Nav.PopupItem:
  label: React.ReactNode
    - The content of the label.
  children: React.ReactNode
    - Popup content.
  icon: string | React.ReactNode
    - Custom icon.
```

--------------------------------

TITLE: 组件入口导出规范
DESCRIPTION: 定义了组件入口文件（如 index.ts）的导出规范，包括默认导出组件本身，以及命名导出组件的 Props 类型和其它类型定义。

SOURCE: https://github.com/alibaba-fusion/next/blob/master/__wiki__/Tech-upgrade.md#_snippet_1

LANGUAGE: typescript
CODE:
```
// components/date-picker/index.ts
export default config(DatePicker);
export type { DatePickerProps };
```

--------------------------------

TITLE: 启动组件调试页面
DESCRIPTION: 启动指定组件的调试页面，方便在开发过程中查看和测试组件。例如，启动 date-picker 组件的调试页面。

SOURCE: https://github.com/alibaba-fusion/next/blob/master/__wiki__/Contributing-guide.md#_snippet_1

LANGUAGE: bash
CODE:
```
npm run start date-picker
```