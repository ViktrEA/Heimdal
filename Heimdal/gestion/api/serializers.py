
from rest_framework import serializers
from gestion.models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea


class RecursoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recurso
        fields = '__all__'

class ProyectoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('codigo', 'nombre', 'descripcion_corta', 'descripcion_larga', 'estado', 'usuario_creacion', 'fecha_creacion', 'fecha_final', 'usuarios_asignados')

class TareaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tarea
        fields = ('codigo', 'nombre', 'descripcion_corta', 'descripcion_larga', 'prioridad', 'estado', 'usuario_creacion', 'fecha_creacion', 'fecha_final', 'proyecto', 'usuarios_asignados')

class AuditoriaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auditoria
        fields = ('fecha_cambio', 'usuario_cambio', 'tipo', 'referencia_id')

class ValidacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Validacion
        fields = ('usuario', 'password')

class Tiempo_TareaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tiempo_Tarea
        fields = ('usuario', 'tarea', 'fecha', 'horas')