from django.db import models
from estoque.models import Produto

class Venda(models.Model):
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Venda {self.id} - {self.data}"

class ItemVenda(models.Model):
    venda = models.ForeignKey(Venda, related_name="itens", on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        # Baixa automática do estoque
        self.produto.quantidade -= self.quantidade
        self.produto.save()
        super().save(*args, **kwargs)
