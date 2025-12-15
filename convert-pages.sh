#!/bin/bash

# Add 'use client' directive and convert links for each page

# for-biologists
echo "'use client';" > app/for-biologists/page.js
echo "" >> app/for-biologists/page.js
sed "s/href=\"\//href=\"\//g; s/<a href/<Link href/g; s/<\/a>/<\/Link>/g" for-biologists.jsx | sed '1d' | sed "1i import Link from 'next/link';" >> app/for-biologists/page.js

# for-miners  
echo "'use client';" > app/for-miners/page.js
echo "" >> app/for-miners/page.js
sed "s/href=\"\//href=\"\//g; s/<a href/<Link href/g; s/<\/a>/<\/Link>/g" for-miners.jsx | sed '1d' | sed "1i import Link from 'next/link';" >> app/for-miners/page.js

# glossary
echo "'use client';" > app/glossary/page.js  
echo "" >> app/glossary/page.js
sed "s/href=\"\//href=\"\//g; s/<a href/<Link href/g; s/<\/a>/<\/Link>/g" glossary.jsx | sed '1d' | sed "1i import Link from 'next/link';" >> app/glossary/page.js

# complex-materials
echo "'use client';" > app/complex-materials/page.js
echo "" >> app/complex-materials/page.js  
sed "s/href=\"\//href=\"\//g; s/<a href/<Link href/g; s/<\/a>/<\/Link>/g" complex-materials.jsx | sed '1d' | sed "1i import Link from 'next/link';" >> app/complex-materials/page.js

# flowsheets
echo "'use client';" > app/flowsheets/page.js
echo "" >> app/flowsheets/page.js
sed "s/href=\"\//href=\"\//g; s/<a href/<Link href/g; s/<\/a>/<\/Link>/g" flowsheets.jsx | sed '1d' | sed "1i import Link from 'next/link';" >> app/flowsheets/page.js

# research
echo "'use client';" > app/research/page.js  
echo "" >> app/research/page.js
sed "s/href=\"\//href=\"\//g; s/<a href/<Link href/g; s/<\/a>/<\/Link>/g" research.jsx | sed '1d' | sed "1i import Link from 'next/link';" >> app/research/page.js

echo "Pages converted!"
