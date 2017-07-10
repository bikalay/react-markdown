import React from 'react';

import {
  MarkdownBoldButton,
  MarkdownItalicButton,
  MarkdownStrikethroughButton,
  MarkdownOrderedListButton,
  MarkdownUnorderedListButton,
  MarkdownBlockQuoteButton,
  MarkdownLinkButton,
  MarkdownHeaderOneButton,
  MarkdownHeaderTwoButton,
  MarkdownHeaderThreeButton,
  MarkdownHeaderFourButton,
  MarkdownHeaderFiveButton,
  MarkdownHeaderSixButton,
  FullScreenButton,
} from '../SlateEditor/plugins';

import {
  AutocompletePlugin,
  MarkdownPreviewPlugin,
} from '../SlateEditor/plugins';

import {SlateEditor, SlateContent, SlateToolbar, SlateToolbarGroup} from '../SlateEditor';

import {Plain} from 'slate';

export default class PlainMarkdownEditor extends React.Component {
  state = {
    editorState: Plain.deserialize(this.props.value || '')
  };

  onChange = (editorState) => {
    this.props.onChange && this.props.onChange(Plain.serialize(editorState));

    this.setState({editorState});
  };

  componentWillMount = () => {
    const {autocompletes = []} = this.props;
    this.plugins = [
      AutocompletePlugin(
        {
          rules: autocompletes
        }
      ),
      MarkdownPreviewPlugin()
    ];
  };

  render() {
    const {editorState} = this.state;
    const {children, onFullScreen, fullScreen} = this.props;

    return (
      <SlateEditor
        state={editorState}
        fullScreen={fullScreen}
        plugins={this.plugins}
        onChange={this.onChange}>

        <SlateToolbar>
          <SlateToolbarGroup>
            <MarkdownBoldButton/>
            <MarkdownItalicButton/>
            <MarkdownStrikethroughButton/>
            <MarkdownLinkButton/>
          </SlateToolbarGroup>

          <SlateToolbarGroup>
            <MarkdownBlockQuoteButton/>
            <MarkdownHeaderOneButton/>
            <MarkdownHeaderTwoButton/>
            <MarkdownHeaderThreeButton/>
            <MarkdownHeaderFourButton/>
            <MarkdownHeaderFiveButton/>
            <MarkdownHeaderSixButton/>
          </SlateToolbarGroup>

          <SlateToolbarGroup>
            <MarkdownOrderedListButton/>
            <MarkdownUnorderedListButton/>
          </SlateToolbarGroup>

          {onFullScreen ? (
            <SlateToolbarGroup>
              <FullScreenButton onClick={onFullScreen} fullScreen={fullScreen}/>
            </SlateToolbarGroup>
          ) : null}

          {children}
        </SlateToolbar>
        <SlateContent/>
      </SlateEditor>
    );
  }
}