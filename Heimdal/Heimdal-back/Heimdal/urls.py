
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
# from rest_framework.authtoken.views import ObtainAuthToken
from gestion import views
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register('recurso', views.RecursoViewSet)
router.register('proyecto', views.ProyectoViewSet)
router.register('tarea', views.TareaViewSet)
router.register('auditoria', views.AuditoriaViewSet)
router.register('validacion', views.ValidacionViewSet)
router.register('tiempo_tarea', views.Tiempo_TareaViewSet)
router.register('user', views.UserViewSet)
router.register('comentario', views.ComentarioViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('gestion/', include(router.urls)),
    #path('auth/', ObtainAuthToken.as_view()),
    path('auth/', views.CustomAuthToken.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


