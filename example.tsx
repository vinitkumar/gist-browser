export enum ButtonSizes {
  default = 'default',
  small = 'small',
  large = 'large'
}

export const ButtonPrimary = (
  props: Props && React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSize.default} {...props}/>;
