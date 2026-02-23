---
title: "Warrant Canary"
date: {{ .Date }}
layout: canary
expires: {{ now.AddDate 0 3 0 | time.Format "2006-01-02" }}
bitcoin_block: 0
bitcoin_hash: ""
---

<!-- Instructions:
1. Write your canary statement in a plain text file
2. Include date, expiration, and bitcoin block inside the text
3. Sign with: gpg --clearsign canary.txt
4. Replace this block with the full output of gpg --clearsign
5. Update bitcoin_block and bitcoin_hash in front matter above
-->

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

Canary statement — YOUR_DOMAIN
Date: YYYY-MM-DD
Expires: YYYY-MM-DD
Bitcoin block: #NNNNNN
Block hash: HASH_FROM_MEMPOOL_SPACE

The operator of this site has not received any:
- Warrants
- Subpoenas
- National Security Letters
- Gag orders
- Court orders requiring disclosure of user data
- Requests to install backdoors or surveillance capabilities

from any government agency or law enforcement body.

This canary is updated quarterly. If it is not renewed by the
expiration date, the absence of this statement should be
interpreted accordingly.

-----BEGIN PGP SIGNATURE-----
(Replace with your actual gpg --clearsign output)
-----END PGP SIGNATURE-----
```
