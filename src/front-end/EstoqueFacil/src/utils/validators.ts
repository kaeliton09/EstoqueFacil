export type FormErrors<T extends string = string> = Partial<Record<T, string>>;

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function validateLogin(email: string, password: string) {
  const errors: FormErrors<'email' | 'password'> = {};
  if (!email.trim()) errors.email = 'Informe seu e-mail.';
  else if (!isEmail(email)) errors.email = 'Digite um e-mail válido, como nome@empresa.com.';
  if (!password) errors.password = 'Informe sua senha.';
  return errors;
}

export type SignupData = {
  name: string;
  email: string;
  company: string;
  password: string;
  confirm: string;
};

export function validateSignup(d: SignupData) {
  const errors: FormErrors<keyof SignupData> = {};
  if (d.name.trim().length < 3) errors.name = 'Digite seu nome completo.';
  if (!d.email.trim()) errors.email = 'Informe seu e-mail.';
  else if (!isEmail(d.email)) errors.email = 'Digite um e-mail válido, como nome@empresa.com.';
  if (d.company.trim().length < 2) errors.company = 'Informe o nome do seu comércio.';
  if (d.password.length < 8) errors.password = 'A senha precisa ter pelo menos 8 caracteres.';
  else if (!/\d/.test(d.password) || !/[A-Za-z]/.test(d.password))
    errors.password = 'Use letras e números na senha.';
  if (!d.confirm) errors.confirm = 'Repita a senha.';
  else if (d.confirm !== d.password) errors.confirm = 'As senhas não são iguais.';
  return errors;
}

export function validateProduct(d: { name: string; code: string; quantity: string; price: string }) {
  const errors: FormErrors<'name' | 'code' | 'quantity' | 'price'> = {};
  if (!d.name.trim()) errors.name = 'Informe o nome do produto.';
  if (!d.code.trim()) errors.code = 'Informe o código de barras.';
  if (d.quantity === '' || isNaN(Number(d.quantity)) || Number(d.quantity) < 0)
    errors.quantity = 'Digite uma quantidade válida.';
  if (d.price === '' || isNaN(Number(d.price.replace(',', '.'))))
    errors.price = 'Digite um preço válido.';
  return errors;
}

export const formatBRL = (v: number) =>
  `R$ ${v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
