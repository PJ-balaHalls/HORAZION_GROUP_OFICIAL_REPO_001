// packages/ui/components/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'tertiary', 'destructive'],
      description: 'Define a intenção visual do botão, seguindo a diretriz Horazion.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Ação Principal',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Ação Principal/i });
    await expect(button).toBeInTheDocument();
    await userEvent.hover(button);
  },
};

export const Secondary: Story = {
  args: {
    children: 'Ação Complementar',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Salvar rascunho',
    variant: 'tertiary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Excluir Conta',
    variant: 'destructive',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Não Permitido',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Processando...',
    isLoading: true,
  },
};