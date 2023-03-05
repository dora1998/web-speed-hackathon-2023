import type { FC } from 'react';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useSignUp } from '../../../hooks/useSignUp';
import { useCloseModal, useIsOpenModal, useOpenModal } from '../../../store/modal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { RhfTextInput } from '../../foundation/RhfTextInput/RhfTextInput';

import * as styles from './SignUpModal.styles';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;

export type SignUpForm = {
  email: string;
  name: string;
  password: string;
};

export const SignUpModal: FC = () => {
  const isOpened = useIsOpenModal('SIGN_UP');
  const { signUp } = useSignUp();

  const handleOpenModal = useOpenModal();
  const handleCloseModal = useCloseModal();

  const [submitError, setSubmitError] = useState<Error | null>(null);

  const { control, formState, handleSubmit, reset } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback<SubmitHandler<SignUpForm>>(
    async (values) => {
      try {
        await signUp({
          variables: {
            email: values.email,
            name: values.name,
            password: values.password,
          },
        });
        reset();
        setSubmitError(null);
        handleCloseModal();
      } catch (err) {
        setSubmitError(err as Error);
      }
    },
    [handleCloseModal, reset, signUp],
  );

  return (
    <Modal onHide={handleCloseModal} show={isOpened}>
      <div className={styles.inner()}>
        <header className={styles.header()}>
          <h2 className={styles.heading()}>会員登録</h2>
          <button
            className={styles.switchToSignInButton()}
            data-testid="modal-switch-to-signin"
            onClick={() => handleOpenModal('SIGN_IN')}
          >
            ログイン
          </button>
        </header>
        <form className={styles.form()} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputList()}>
            <RhfTextInput
              required
              control={control}
              label="メールアドレス"
              name="email"
              placeholder="メールアドレスを入力"
              rules={{
                // NOTE: 文字列に @ が含まれているか確認する
                validate: (v) =>
                  v == '' || !NOT_INCLUDED_AT_CHAR_REGEX.test(v) || 'メールアドレスの形式が間違っています',
              }}
              type="email"
            />
            <p className={styles.error()}>{formState.errors.email?.message}</p>

            <RhfTextInput required control={control} label="名前" name="name" placeholder="名前を入力" type="text" />
            <p className={styles.error()}>{formState.errors.name?.message}</p>

            <RhfTextInput
              required
              control={control}
              label="パスワード"
              name="password"
              placeholder="パスワードを入力"
              rules={{
                // NOTE: 文字列に英数字以外の文字が含まれているか確認する
                validate: (v) =>
                  v == '' || !NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(v) || '英数字以外の文字を含めてください',
              }}
              type="password"
            />
            <p className={styles.error()}>{formState.errors.password?.message}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              登録する
            </PrimaryButton>
          </div>
          {submitError ? <p className={styles.error()}>会員登録に失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};
