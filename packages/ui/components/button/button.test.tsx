// packages/ui/components/button/button.test.tsx
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Horazion Button Component', () => {
  it('deve renderizar o botão com o texto correto', () => {
    render(<Button>Confirmar</Button>);
    expect(screen.getByRole('button', { name: 'Confirmar' })).toBeInTheDocument();
  });

  it('deve aplicar a opacidade de 38% e ignorar eventos quando desabilitado', async () => {
    const onClickMock = jest.fn();
    render(<Button disabled onClick={onClickMock}>Desabilitado</Button>);
    
    const button = screen.getByRole('button', { name: 'Desabilitado' });
    expect(button).toBeDisabled();
    
    await userEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('deve renderizar como um Slot (polimorfismo) quando asChild for true', () => {
    render(
      <Button asChild>
        <a href="/dashboard">Ir para Dashboard</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Ir para Dashboard' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('deve exibir spinner e atributo aria-busy quando isLoading for true', () => {
    render(<Button isLoading>Enviando</Button>);
    const button = screen.getByRole('button', { name: 'Enviando' });
    
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });
});