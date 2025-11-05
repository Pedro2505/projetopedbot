from rest_framework import viewsets, decorators, response
from django.utils import timezone
from django.db.models import Sum
from datetime import timedelta
from ..models import Produto, Atividade
from ..serializers import ProdutoSerializer, AtividadeSerializer


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

    def get_queryset(self):
        qs = Produto.objects.all()
        q = self.request.query_params.get("search")
        if q:
            q = q.strip()
            if q:
                qs = qs.filter(nome__icontains=q)
        return qs

    @decorators.action(detail=False, methods=["get"])
    def total(self, request):
        total_produtos = Produto.objects.count()
        total_quantidade = Produto.objects.aggregate(
            total=Sum('quantidade'))['total'] or 0
        
        print(f"Total produtos: {total_produtos}")
        print(f"Total quantidade: {total_quantidade}")
        
        return response.Response({
            "total_produtos": total_produtos,
            "total_quantidade": total_quantidade
        })

    @decorators.action(detail=False, methods=["get"])
    def vencimentos_proximos(self, request):
        hoje = timezone.now().date()
        limite = hoje + timedelta(days=60)
        produtos = Produto.objects.filter(data_validade__range=[hoje, limite])
        serializer = self.get_serializer(produtos, many=True)
        return response.Response(serializer.data)

    @decorators.action(detail=False, methods=["get"])
    def baixo_estoque(self, request):
        """Retorna produtos com quantidade baixa (entre 1 e 10)"""
        produtos = Produto.objects.filter(quantidade__gt=0, quantidade__lt=10)
        serializer = self.get_serializer(produtos, many=True)
        return response.Response(serializer.data)

    @decorators.action(detail=False, methods=["get"])
    def alta_demanda(self, request):
        produtos = Produto.objects.filter(quantidade__lt=20)
        serializer = self.get_serializer(produtos, many=True)
        return response.Response(serializer.data)

    @decorators.action(detail=False, methods=["get"])
    def atividades_recentes(self, request):
        produtos_recentes = Produto.objects.all().order_by('-id')[:4]
        
        atividades = []
        for produto in produtos_recentes:
            atividades.append({
                'id': produto.id,
                'tipo': 'entrada',
                'produto': produto.nome,
                'quantidade': produto.quantidade,
                'data': produto.data_validade,
                'detalhes': f'Lote: {produto.lote}'
            })
        
        return response.Response(atividades)
