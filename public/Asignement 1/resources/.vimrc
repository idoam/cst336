" ~/.vimrc

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'

Plugin 'tpope/vim-sensible'

Plugin 'dracula/vim', { 'name': 'dracula' }

Plugin 'micha/vim-colors-solarized'

call vundle#end()

filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on

runtime! plugin/sensible.vim

set encoding=utf-8 fileencodings=
syntax on

set mouse=a
set number
set cc=80
set expandtab ts=4 sw=4 ai

autocmd Filetype make setlocal noexpandtab

set list listchars=tab:»·,trail:·

colorscheme dracula

hi Normal guibg=NONE ctermbg=NONE
