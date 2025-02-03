---
title: PyTorch ile İlk Sinir Ağınızı Oluşturun
author: Efe Ataş
date: 2024-03-22
category: Yapay Zeka
description: PyTorch kütüphanesi kullanarak basit bir yapay sinir ağı oluşturmayı ve eğitmeyi adım adım öğrenin.
github: https://github.com/efe-atas/pytorch-mnist-example
---

# PyTorch ile İlk Sinir Ağınızı Oluşturun

Bu yazıda, PyTorch kullanarak basit bir yapay sinir ağı oluşturmayı ve MNIST veri seti üzerinde eğitmeyi öğreneceğiz. PyTorch, dinamik hesaplama grafikleri ve kolay kullanımı ile derin öğrenme alanında en popüler framework'lerden biridir.

## Gerekli Kütüphanelerin Kurulumu

İlk olarak, gerekli kütüphaneleri yüklememiz gerekiyor:

```python
pip install torch torchvision numpy matplotlib
```

## Veri Setinin Hazırlanması

MNIST veri setini yükleyelim ve ön işlemden geçirelim:

```python
import torch
import torchvision
import torchvision.transforms as transforms

# Veri dönüşümlerini tanımlama
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Eğitim ve test veri setlerini yükleme
trainset = torchvision.datasets.MNIST(root='./data', train=True,
                                    download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=64,
                                        shuffle=True)
```

## Sinir Ağı Modelinin Oluşturulması

Şimdi basit bir sinir ağı modeli tanımlayalım:

```python
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(784, 128)  # 28x28 = 784 giriş
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)    # 10 sınıf için çıkış
    
    def forward(self, x):
        x = x.view(-1, 784)  # Düzleştirme
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = Net()
```

## Modelin Eğitilmesi

Modelimizi eğitmek için kayıp fonksiyonu ve optimizasyon algoritmasını belirlememiz gerekiyor:

```python
import torch.optim as optim

criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Eğitim döngüsü
for epoch in range(5):
    running_loss = 0.0
    for i, data in enumerate(trainloader, 0):
        inputs, labels = data
        
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        if i % 100 == 99:
            print(f'[{epoch + 1}, {i + 1}] kayıp: {running_loss / 100:.3f}')
            running_loss = 0.0

print('Eğitim tamamlandı!')
```

## Model Performansının Değerlendirilmesi

Eğitilen modelin performansını test veri seti üzerinde değerlendirelim:

```python
correct = 0
total = 0
with torch.no_grad():
    for data in testloader:
        images, labels = data
        outputs = model(images)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

print(f'Test veri seti üzerinde doğruluk: {100 * correct / total}%')
```

## Sonuç

Bu örnekte, PyTorch kullanarak basit bir sinir ağı oluşturduk ve MNIST veri seti üzerinde eğittik. Bu temel örnek üzerine inşa ederek daha karmaşık modeller geliştirebilirsiniz.

Bir sonraki yazımızda, CNN (Evrişimli Sinir Ağları) ile görüntü sınıflandırma konusunu ele alacağız. Görüşmek üzere! 