export const required = value => (value ? undefined : "必填项");
export const minLength = length => value => (value.length >= length ? undefined : `长度至少为${length}`);
export const maxLength = length => value => (value.length <= length ? undefined : `长度最多为${length}`);
export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);
