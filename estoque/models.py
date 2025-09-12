from django.db import models

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    lote = models.CharField(max_length=50)
    fornecedor = models.CharField(max_length=100)
    data_validade = models.DateField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.nome} - Lote {self.lote}"

    @property
    def em_baixo_estoque(self):
        return self.quantidade < 10
