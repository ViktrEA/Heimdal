
from django.db import models
from django.contrib.auth.models import User


class Recurso(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50,null=True)
    email = models.EmailField(max_length=254)
    tipo = models.CharField(max_length=1)
    imagen = models.ImageField(upload_to = 'static/', default = 'pic_folder/None/no-img.jpg')

    def __str__(self):         
        return self.nombre
    

class Proyecto(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=140)
    descripcion_larga = models.CharField(max_length=255,null=True)
    estado = models.CharField(max_length=1,null=True)
    usuario_creacion = models.ForeignKey(Recurso, on_delete = models.CASCADE, related_name='creacion_proyecto')
    fecha_creacion = models.DateTimeField(auto_now=True, auto_now_add=False)
    fecha_final = models.DateTimeField(auto_now=False, auto_now_add=False)
    usuarios_asignados = models.ManyToManyField(Recurso, related_name='asginados_proyecto') #checkear many to many

    def __str__(self):         
        return self.nombre
    

class Tarea(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=140)
    descripcion_larga = models.CharField(max_length=255,null=True)
    prioridad = models.CharField(max_length=1,null=True)
    estado = models.CharField(max_length=1,null=True)
    usuario_creacion = models.ForeignKey(Recurso, on_delete = models.CASCADE, related_name='creacion_tarea')
    fecha_creacion = models.DateTimeField(auto_now=True, auto_now_add=False)
    fecha_final = models.DateTimeField(auto_now=False, auto_now_add=False)
    proyecto = models.ForeignKey(Proyecto,on_delete = models.CASCADE)
    usuarios_asignados = models.ManyToManyField(Recurso, related_name='asignados_tarea') #checkear many to many

    def __str__(self):         
        return self.nombre


class Auditoria(models.Model):
    fecha_cambio = models.DateTimeField(auto_now=True, auto_now_add=False)
    usuario_cambio = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    tipo = models.CharField(max_length=1,null=True)
    referencia_id = models.IntegerField()


class Validacion(models.Model):
    usuario = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    password = models.CharField(max_length=50)


class Tiempo_Tarea(models.Model):
    usuario = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    tarea = models.ForeignKey(Tarea,on_delete = models.CASCADE)
    fecha = models.DateTimeField(auto_now=False, auto_now_add=False)
    horas = models.IntegerField()
