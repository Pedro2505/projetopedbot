from django.contrib import admin
from .models import Produto, Atividade, Fornecedor

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'lote', 'fornecedor', 'data_validade', 'preco', 'quantidade', 'data_cadastro')
    search_fields = ('nome', 'lote', 'fornecedor')
    list_filter = ('fornecedor', 'data_validade')
    ordering = ('-data_cadastro',)

@admin.register(Atividade)
class AtividadeAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'produto', 'quantidade', 'data', 'detalhes')
    search_fields = ('produto__nome', 'tipo', 'detalhes')
    list_filter = ('tipo', 'data')
    ordering = ('-data',)

@admin.register(Fornecedor)
class FornecedorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'contato', 'email', 'telefone', 'data_criacao')
    search_fields = ('nome', 'email', 'contato', 'telefone')
    ordering = ('nome',)
