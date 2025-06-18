# Instruções de Instalação e Uso - Ui24r Controller PWA

## O que é esta solução?

Esta é uma **Progressive Web App (PWA)** que funciona como uma alternativa ao aplicativo Android nativo para controlar sua mesa de som Soundcraft Ui24r. A PWA oferece uma experiência similar a um aplicativo nativo, podendo ser instalada na tela inicial do dispositivo e executada em tela cheia.

## Vantagens da PWA:

✅ **Instalação simples**: Não precisa de Android Studio ou compilação  
✅ **Multiplataforma**: Funciona em Android, iOS, Windows, Mac, Linux  
✅ **Tela cheia**: Interface sem barras do navegador  
✅ **Offline**: Funciona mesmo sem internet (após primeira instalação)  
✅ **Atualizações automáticas**: Sempre a versão mais recente  
✅ **Sem Play Store**: Instalação direta via navegador  

## Como instalar nos dispositivos:

### Para Android:
1. Abra o Chrome no dispositivo Android
2. Acesse o endereço onde a PWA está hospedada
3. Toque no menu (⋮) e selecione "Adicionar à tela inicial"
4. Ou aguarde o prompt automático de instalação aparecer
5. Confirme a instalação
6. O ícone aparecerá na tela inicial como um aplicativo normal

### Para iOS:
1. Abra o Safari no dispositivo iOS
2. Acesse o endereço da PWA
3. Toque no botão de compartilhar (□↗)
4. Selecione "Adicionar à Tela de Início"
5. Confirme a instalação

### Para Desktop (Windows/Mac/Linux):
1. Abra Chrome, Edge ou Firefox
2. Acesse o endereço da PWA
3. Clique no ícone de instalação na barra de endereços
4. Ou vá no menu e selecione "Instalar [nome do app]"

## Como usar:

1. **Primeira configuração**:
   - Insira o endereço IP da sua mesa Ui24r (ex: 192.168.4.132)
   - Opcionalmente, insira uma porta diferente se necessário
   - Clique em "Conectar à Mesa de Som"

2. **Interface em tela cheia**:
   - A PWA carregará a interface da Ui24r em tela cheia
   - Para mostrar os controles, deslize para baixo do topo da tela
   - Os controles incluem: status de conexão, atualizar, tela cheia e configurações

3. **Recursos disponíveis**:
   - **🔄 Atualizar**: Recarrega a interface da mesa
   - **⛶ Tela Cheia**: Alterna entre tela cheia e janela
   - **⚙️ Configurar**: Volta à tela de configuração para alterar IP
   - **Status**: Mostra se está conectado à mesa (ponto verde/vermelho)

4. **Gestos e atalhos**:
   - **Deslizar para baixo**: Mostra barra de controles
   - **Deslizar para cima**: Esconde barra de controles
   - **F11**: Alterna tela cheia (desktop)
   - **F5**: Atualiza a interface (desktop)
   - **Esc**: Volta às configurações (desktop)

## Recursos técnicos:

- **Modo offline**: Após a primeira instalação, a PWA funciona mesmo sem internet
- **Responsivo**: Adapta-se automaticamente a diferentes tamanhos de tela
- **Orientação**: Funciona tanto em modo retrato quanto paisagem
- **Persistência**: Lembra do último IP configurado
- **Service Worker**: Garante funcionamento offline e atualizações automáticas

## Solução de problemas:

**Não consegue conectar à mesa:**
- Verifique se o IP está correto
- Certifique-se de que o dispositivo está na mesma rede da mesa
- Teste o IP no navegador normal primeiro

**PWA não instala:**
- Use Chrome no Android ou Safari no iOS
- Certifique-se de que está acessando via HTTPS (se hospedado online)
- Limpe o cache do navegador e tente novamente

**Interface não carrega:**
- Verifique a conexão de rede
- Tente atualizar usando o botão 🔄
- Reinicie a PWA fechando e abrindo novamente

## Hospedagem:

Para usar esta PWA, você precisa hospedar os arquivos em um servidor web. Opções:

1. **Servidor local**: Use um servidor HTTP simples na sua rede local
2. **Hospedagem gratuita**: GitHub Pages, Netlify, Vercel
3. **Servidor próprio**: Apache, Nginx, ou qualquer servidor web

A PWA está pronta para uso e oferece uma experiência muito próxima ao aplicativo Android nativo que você queria criar!

