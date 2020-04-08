
from rest_framework import serializers
from gestion.models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea
from django.contrib.auth.models import User


class RecursoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recurso
        fields = ('id', 'codigo', 'nombre', 'primer_apellido', 'segundo_apellido', 'email', 'tipo', 'imagen')

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

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password' : {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user