from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    lote = models.CharField(max_length=50)
    fornecedor = models.CharField(max_length=100)
    data_validade = models.DateField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField()
    data_cadastro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} ({self.lote})"

    @property
    def dias_para_vencer(self):
        from django.utils import timezone
        if not self.data_validade:
            return None
        delta = self.data_validade - timezone.now().date()
        return delta.days

    class Meta:
        ordering = ['-data_cadastro']


class Atividade(models.Model):
    TIPO_CHOICES = [
        ('entrada', 'Entrada de Estoque'),
        ('venda', 'Venda Realizada'),
        ('ajuste', 'Ajuste de Estoque'),
    ]
    
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    data = models.DateTimeField(auto_now_add=True)
    detalhes = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['-data']
        verbose_name = "Atividade"
        verbose_name_plural = "Atividades"

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.produto} ({self.quantidade})"


class Fornecedor(models.Model):
    nome = models.CharField(max_length=150)
    contato = models.CharField(max_length=150, blank=True)
    email = models.EmailField(blank=True)
    telefone = models.CharField(max_length=50, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    observacoes = models.TextField(blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

    class Meta:
        ordering = ['nome']
        verbose_name = "Fornecedor"
        verbose_name_plural = "Fornecedores"

@receiver(post_save, sender=Produto)
def delete_empty_product(sender, instance, **kwargs):
    if instance.quantidade <= 0:
        instance.delete()
