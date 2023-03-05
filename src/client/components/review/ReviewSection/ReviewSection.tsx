import type { FC } from 'react';
import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { ReviewFragmentResponse } from '../../../graphql/fragments';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { RhfTextArea } from '../../foundation/RhfTextArea';
import { ReviewList } from '../ReviewList';

import * as styles from './ReviewSection.styles';

const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;

type Props = {
  reviews: ReviewFragmentResponse[] | undefined;
  hasSignedIn: boolean;
  onSubmitReview: (reviewForm: ReviewForm) => void;
};

type ReviewForm = {
  comment: string;
};

export const ReviewSection: FC<Props> = ({ hasSignedIn, onSubmitReview, reviews }) => {
  const { control, formState, handleSubmit, reset } = useForm<ReviewForm>({
    defaultValues: {
      comment: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback<SubmitHandler<ReviewForm>>(
    async (value) => {
      onSubmitReview(value);
      reset();
    },
    [onSubmitReview, reset],
  );

  return (
    <div>
      {reviews != null ? <ReviewList reviews={reviews} /> : null}
      {hasSignedIn && (
        <form className={styles.form()} data-testid="form-review" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.commentTextAreaWrapper()}>
            <RhfTextArea
              required
              control={control}
              label="レビューを送信する"
              name="comment"
              placeholder="こちらの野菜はいかがでしたか？"
              rows={6}
              rules={{
                // NOTE: 改行含めて 64 文字以内であるかどうか確認する
                validate: (v) => v == '' || LESS_THAN_64_LENGTH_REGEX.test(v) || '64 文字以内でコメントしてください',
              }}
            />
            <p className={styles.error()}>{formState.errors.comment?.message}</p>
          </div>
          <div className={styles.submitButton()}>
            <PrimaryButton size="base" type="submit">
              送信
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};
