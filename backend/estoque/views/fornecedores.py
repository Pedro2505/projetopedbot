from rest_framework import viewsets
from ..models import Fornecedor
from ..serializers import FornecedorSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params.get("search")
        if q:
            q = q.strip()
            if q:
                qs = qs.filter(
                    models.Q(nome__icontains=q) |
                    models.Q(email__icontains=q) |
                    models.Q(contato__icontains=q)
                )
        return qs