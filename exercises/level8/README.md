
Start :
./workshopctl -n level8 apply -f level8/.backstage/level8.yml

check status
./workshopctl -n level8 get all                              

Go to website, upload file
http://upload.level8.localhost/

delete the pod to force a restart
./workshopctl -n level8 delete pods --all

On the website, the file uploaded disappeared

