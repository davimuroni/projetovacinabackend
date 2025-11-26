#!/bin/bash

echo "=========================================="
echo "Sistema de Controle de Vacinas"
echo "=========================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "Por favor, instale o Node.js versão 14 ou superior"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo ""

# Navegar para o diretório do backend
cd backend

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    npm install
    echo ""
fi

# Verificar se o banco de dados existe
if [ ! -f "database.sqlite" ]; then
    echo "🗄️  Banco de dados não encontrado. Criando e populando..."
    node seed.js
    echo ""
fi

# Iniciar o servidor
echo "🚀 Iniciando servidor backend..."
echo "📡 API disponível em: http://localhost:3000"
echo ""
echo "Para parar o servidor, pressione Ctrl+C"
echo "=========================================="
echo ""

npm start
