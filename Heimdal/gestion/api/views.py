
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from gestion.models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea
from gestion.api.serializers import RecursoSerializer, ProyectoSerializer, TareaSerializer, AuditoriaSerializer, ValidacionSerializer, Tiempo_TareaSerializer


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    def perform_create(self, serializer):
        serializer.save(id=87298222, estado='P', usuario_creacion=Recurso.objects.get(pk = 3))
    def perform_update(self, serializer):
        serializer.save()

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer

class ValidacionViewSet(viewsets.ModelViewSet):
    queryset = Validacion.objects.all()
    serializer_class = ValidacionSerializer

class Tiempo_TareaViewSet(viewsets.ModelViewSet):
    queryset = Tiempo_Tarea.objects.all()
    serializer_class = Tiempo_TareaSerializer