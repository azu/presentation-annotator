## CSS

## Naming Convention

Apply [SUIT CSS](http://suitcss.github.io/ "SUIT CSS") convention.

## Not use desentant states class

- Always Use `Component.is-state` 
- Not use `.is-state ChildComponent`


e.g.) We want to set `is-active` to textarea.

```js
export default class PageEditor extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PageEditor",
            states: {
                active: this.props.isActive
            }
        });
        return <div className={className}>
            // how to add `is-active`?
            <textarea placeholder="input annotation" className="PageEditor-textarea">
                
            </textarea>
        </div>;
    }
}
```

We do separate `<textarea>` to other component


Result

`PageEditorTextarea.js`:

```js
const React = require("react");
const suitClassNames = require("suitcss-classnames");
export default class PageEditorTextarea extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PageEditorTextarea",
            states: {
                active: this.props.isActive
            }
        });
        return <textarea placeholder="input annotation" className={className}>

        </textarea>
    }
}

PageEditorTextarea.propTypes = {isActive: React.PropTypes.bool};
```

`PageEditor.js` use `<PageEditorTextarea />`

```
const React = require("react");
const suitClassNames = require("suitcss-classnames");
import PageEditorTextarea from "./PageEditorTextarea";
export default class PageEditor extends React.Component {
    render() {
        const className = suitClassNames({
            component: "PageEditor",
            states: {
                active: this.props.isActive
            }
        });
        return <div className={className}>
            <PageEditorTextarea isActive={this.props.isActive}/>
        </div>;
    }
}
PageEditor.propTypes = {isActive: React.PropTypes.bool};
```

## Constant Variable

Constants variable is defined `css/var`.

You should not re-define variable in component.
Insteadof it, you should define new variable for component.

CSS's `var` should be immutable variable. not use as mutable variable.

e.g.)PageEditorTextarea's `font-size`

`PageEditorTextarea.css` use `--PageEditorTextareaIsActive-font-size` variable.

```css
.PageEditorTextarea.is-active {
    font-size: var(--PageEditorTextareaIsActive-font-size, large);
}
```

`--PageEditorTextareaIsActive-font-size` is defined in `css/var/font-size.css`

