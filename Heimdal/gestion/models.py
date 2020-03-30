from django.db import models

# Create your models here.

class Recurso(models.Model):
    id = models.IntegerField(primary_key=True) #CODIGO - pendiente de preguntar (directorio activo)
    nombre = models.CharField(max_length=50)
    primer_apellido = models.CharField(max_length=50)
    segundo_apellido = models.CharField(max_length=50,null=True)
    email = models.EmailField(max_length=254)
    tipo = models.CharField(max_length=1)
    imagen = models.ImageField(upload_to = 'static/', default = 'pic_folder/None/no-img.jpg')
    


class Proyecto(models.Model):
    id = models.IntegerField(primary_key=True) #CODIGO - pendiente de preguntar (directorio activo)
    nombre = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=140)
    descripcion_larga = models.CharField(max_length=255,null=True)
    estado = models.CharField(max_length=1,null=True)
    usuario_creacion = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now=True, auto_now_add=False)
    fecha_final = models.DateTimeField(auto_now=False, auto_now_add=False)
    #usuarios_asginados = many to many #checkear many to many
    

class Tarea(models.Model):
    id = models.IntegerField(primary_key=True) #CODIGO - pendiente de preguntar (directorio activo)
    nombre = models.CharField(max_length=50)
    descripcion_corta = models.CharField(max_length=140)
    descripcion_larga = models.CharField(max_length=255,null=True)
    prioridad = models.CharField(max_length=1,null=True)
    estado = models.CharField(max_length=1,null=True)
    usuario_creacion = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now=True, auto_now_add=False)
    fecha_final = models.DateTimeField(auto_now=False, auto_now_add=False)
    proyecto = models.ForeignKey(Proyecto,on_delete = models.CASCADE)
    #usuarios_asginados = many to many #checkear many to many


class Auditoria(models.Model):
    fecha_cambio = models.DateTimeField(auto_now=True, auto_now_add=False)
    usuario_cambio = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    tipo = models.CharField(max_length=1,null=True)
    auditoria_id = models.IntegerField()


class Validacion(models.Model):
    usuario = models.ForeignKey(Recurso,on_delete = models.CASCADE)
    password = models.CharField(max_length=50)