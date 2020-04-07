
from django.shortcuts import render,redirect
from .models import Recurso, Proyecto, Tarea, Auditoria, Validacion, Tiempo_Tarea
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm

from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import RecursoSerializer, ProyectoSerializer, TareaSerializer, AuditoriaSerializer, ValidacionSerializer, Tiempo_TareaSerializer


class RecursoViewSet(viewsets.ModelViewSet):
    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer
    permission_classes = (IsAuthenticated,)
    authentication_class = (TokenAuthentication,)
    def perform_create(self, serializer):
        serializer.save(id=1)


class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    def perform_create(self, serializer):
        serializer.save(id=1)#apoyo--> estado='P', usuario_creacion=Recurso.objects.get(pk = 3))
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


class Login(FormView):
    template_name = 'login.html'
    form_class = AuthenticationForm
    success_url = reverse_lazy('recurso-list')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        user = authenticate(username = form.cleaned_data['username'], password = form.cleaned_data['password'])
        token,_ = Token.objects.get_or_create(user = user)
        if token:
            login(self.request, form.get_user())
            return super(Login, self).form_valid(form)

class Logout(APIView):
    def get(self,request, format = None):
        request.user.auth_token.delete()
        logout(request)
        return Response(status = status.HTTP_200_OK)
