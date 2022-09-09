import sys,re
d={}
s=list(enumerate(sys.stdin.readlines()))
for n,l in s:
 try:
     v,l=l.split('=')
     v=v.strip();
     d[v]=d.get(v,[])+[[0,n]]
 except:
  for v in re.findall('[a-zA-Z_]\w*',l):d[v][-1][0]+=1
print(''.join(l for n,l in s if n not in[n for x in list(d.values())for c,n in x if c==0]))