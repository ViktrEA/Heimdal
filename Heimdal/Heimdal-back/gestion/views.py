
from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from .models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea, Comentario

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import RecursoSerializer, ProyectoSerializer, TareaSerializer, AuditoriaSerializer, ValidacionSerializer, Tiempo_TareaSerializer, UserSerializer, ComentarioSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('id','activo','asignados_proyecto','asignados_tarea')
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)



class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    filter_backends = (DjangoFilterBackend,SearchFilter,OrderingFilter)
    filter_fields = ('id','usuarios_asignados','estado','nombre',)
    search_fields=('nombre',)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        serializer.save()   #apoyo--> estado='P', usuario_creacion=Recurso.objects.get(pk = 3))
    def perform_update(self, serializer):
        serializer.save()
        

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('proyecto', 'id', 'usuarios_asignados', 'estado')
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('fecha_cambio','usuario_cambio','tipo','referencia_id')
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)



class ValidacionViewSet(viewsets.ModelViewSet):
    queryset = Validacion.objects.all()
    serializer_class = ValidacionSerializer


class Tiempo_TareaViewSet(viewsets.ModelViewSet):
    queryset = Tiempo_Tarea.objects.all()
    serializer_class = Tiempo_TareaSerializer
    basic_fields = ('tarea__nombre','usuario__nombre','fecha')
    filter_backends = (filters.DjangoFilterBackend, OrderingFilter)
    filter_fields = basic_fields
    ordering_fields = basic_fields
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        recurso = Recurso.objects.filter(codigo=user.pk).values()[0]
        return Response({
            'token': token.key,
            'user_id': user.id,
            'recurso': recurso,        
            
        })

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_fields = ('tarea', 'id', 'usuario', 'fecha_creacion')
    ordering_fields = ('fecha_creacion',)
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)