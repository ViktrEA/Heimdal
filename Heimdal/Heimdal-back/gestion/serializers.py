
from rest_framework import serializers
from gestion.models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea


class RecursoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recurso
        fields = '__all__'

class ProyectoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'
class TareaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'

class AuditoriaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auditoria
        fields = '__all__'

class ValidacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Validacion
        fields = '__all__'

class Tiempo_TareaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tiempo_Tarea
        fields = '__all__'
