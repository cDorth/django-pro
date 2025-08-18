
from django import forms
from .models import Contact

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('name', 'relation', 'phone', 'email')
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nome'}),
            'relation': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Relacionamento'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Telefone'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email'}),
        }

class AddForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('name', 'relation', 'phone', 'email')
