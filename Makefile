.RECIPEPREFIX := >

.PHONY: dev build clean check deploy

dev:
>npm run dev

build:
>npm run build

clean:
>node -e "const fs=require('fs'); ['.next','node_modules'].forEach((dir) => fs.rmSync(dir,{recursive:true,force:true}))"
>npm install

check:
>npm run check

deploy:
>git add .
>git commit
>git push
