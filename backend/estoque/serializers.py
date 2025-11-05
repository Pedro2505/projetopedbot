from rest_framework import serializers
from .models import Produto, Atividade, Fornecedor

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'lote', 'fornecedor', 'data_validade', 'preco', 'quantidade', 'data_cadastro']

class AtividadeSerializer(serializers.ModelSerializer):
    produto = serializers.StringRelatedField()
    
    class Meta:
        model = Atividade
        fields = ['id', 'tipo', 'produto', 'quantidade', 'data', 'detalhes']

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = ['id', 'nome', 'contato', 'email', 'telefone', 'endereco', 'observacoes', 'data_criacao']
