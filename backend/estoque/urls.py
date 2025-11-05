from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.produtos import ProdutoViewSet
from .views.fornecedores import FornecedorViewSet

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'fornecedores', FornecedorViewSet, basename='fornecedor')

urlpatterns = [
    path('', include(router.urls)),
]
