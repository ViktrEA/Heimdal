
from rest_framework import serializers
from gestion.models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea, Comentario
from django.contrib.auth.models import User


class RecursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recurso
        fields = ('id', 'codigo', 'nombre', 'primer_apellido', 'segundo_apellido', 'email', 'tipo', 'imagen', 'activo','asignados_proyecto','asignados_tarea','asignados_tiempo')#'__all__'

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('id', 'codigo', 'nombre', 'descripcion_corta', 'descripcion_larga', 'estado', 'usuario_creacion', 'fecha_creacion', 'fecha_final', 'usuarios_asignados')#'__all__'
class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ('id', 'codigo', 'nombre', 'descripcion_corta', 'descripcion_larga', 'prioridad', 'estado', 'usuario_creacion', 'fecha_creacion', 'fecha_final', 'proyecto', 'usuarios_asignados')#'__all__'

class AuditoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = ('id', 'fecha_cambio', 'usuario_cambio', 'tipo', 'referencia_id')#'__all__'

class ValidacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Validacion
        fields = '__all__'

class Tiempo_TareaSerializer(serializers.ModelSerializer):
    # tarea = serializers.StringRelatedField()
    # usuario = serializers.StringRelatedField()

    class Meta:
        model = Tiempo_Tarea
        fields = ['id', 'usuario', 'tarea', 'fecha', 'horas']#'__all__'


class UserSerializer(serializers.ModelSerializer):   
    recurso = RecursoSerializer()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'recurso')
        extra_kwargs = {'password' : {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ('id', 'tarea', 'texto', 'usuario', 'fecha_creacion')#'__all__'