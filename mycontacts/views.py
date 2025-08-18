
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Contact
from .forms import ContactForm

def show(request):
    contacts = Contact.objects.all()
    return render(request, 'mycontacts/show.html', {'contacts': contacts})

def add(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Contato adicionado com sucesso!')
            return redirect('show')
    else:
        form = ContactForm()
    return render(request, 'mycontacts/add.html', {'form': form})

def edit(request, contact_id):
    contact = get_object_or_404(Contact, id=contact_id)
    if request.method == 'POST':
        form = ContactForm(request.POST, instance=contact)
        if form.is_valid():
            form.save()
            messages.success(request, 'Contato atualizado com sucesso!')
            return redirect('show')
    else:
        form = ContactForm(instance=contact)
    return render(request, 'mycontacts/edit.html', {'form': form, 'contact': contact})

def delete(request, contact_id):
    contact = get_object_or_404(Contact, id=contact_id)
    if request.method == 'POST':
        contact.delete()
        messages.success(request, 'Contato excluído com sucesso!')
        return redirect('show')
    return render(request, 'mycontacts/delete.html', {'contact': contact})
