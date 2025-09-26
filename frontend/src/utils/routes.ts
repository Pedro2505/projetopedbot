interface RoutesProps {
    href: string
    label: string
}

export const routes: RoutesProps[] = [
    { href: '/', label: 'Dashboard' },
    { href: '/estoque', label: 'Estoque' },
    { href: '/vendas', label: 'Vendas' },
    { href: '/fornecedores', label: 'Fornecedores' },
    { href: '/relatorios', label: 'Relatórios' },
]