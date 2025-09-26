from django.contrib import admin
from django.urls import path, include
from .views import home

from rest_framework import routers
from estoque.views import ProdutoViewSet
from vendas.views import VendaViewSet, ItemVendaViewSet

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'vendas', VendaViewSet)
router.register(r'itens-venda', ItemVendaViewSet)

urlpatterns = [
    path('', home),  # Página inicial
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
