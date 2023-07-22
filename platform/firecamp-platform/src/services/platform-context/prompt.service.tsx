import ReactDOM from 'react-dom';
import { modals, IModal } from '@firecamp/ui';
import Confirm, { IConfirm } from '../../components/prompt/Confirm';
import { PromptInput } from '../../components/prompt/PromptInput';
import { PromptSaveItem } from '../../components/prompt/PromptSaveItem';
import { IPromptInput, IPromptSaveItem } from '../../components/prompt/types';

type TPropKeys =
  | 'header'
  | 'label'
  | 'placeholder'
  | 'texts'
  | 'value'
  | 'validator'
  | 'executor'
  | 'onError';
type TPromptInputOpenProps = Pick<IPromptInput, TPropKeys>;
type TOpenPromptInput = (props: TPromptInputOpenProps) => Promise<any>;
const promptInput: TOpenPromptInput = (props) => {
  // @ts-ignore
  const promptContainer = document.createElement('div');
  const onClose = () => {
    ReactDOM.unmountComponentAtNode(promptContainer);
  };
  return new Promise((rs, rj) => {
    ReactDOM.render(
      <PromptInput
        {...props}
        onClose={onClose}
        onResolve={(res) => rs(res)} //resolve for executor
      />,
      promptContainer
    );
  });
};

type TPromptSaveItemProps = Pick<IPromptSaveItem, TPropKeys | 'collection'>;
type TOpenPromptSaveItem = (props: TPromptSaveItemProps) => Promise<any>;
const promptSaveItem: TOpenPromptSaveItem = (props) => {
  // @ts-ignore
  const promptContainer = document.createElement('div');
  const onClose = () => {
    ReactDOM.unmountComponentAtNode(promptContainer);
  };
  return new Promise((rs, rj) => {
    ReactDOM.render(
      <PromptSaveItem
        {...props}
        collection={props.collection}
        onClose={onClose}
        onResolve={(res) => rs(res)} //resolve for executor
      />,
      promptContainer
    );
  });
};



const confirm = (props: IModal & IConfirm) => {

  return new Promise((rs, rj) => {
    modals.open({
      title: (
        <label className="text-sm font-semibold leading-3 block text-app-foreground-inactive uppercase w-full relative px-2">
          {`Confirmation Required.`}
        </label>
      ),
      children: (
        <Confirm
          {...props}
          onCancel={() => {
            props?.onCancel?.();
            modals.closeAll()
          }}
          onConfirm={() => {
            props?.onConfirm?.();
            rs(true)
          }} />
      ),
      size: 400,
      classNames: {
        header: 'border-0',
        body: 'px-6',
        content: 'min-h-0',
      },
    });
  });
};

export { promptInput, promptSaveItem, confirm };
