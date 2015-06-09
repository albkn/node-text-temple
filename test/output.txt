# Install curl, git, meteor
RUN apt-get update && apt-get install -y curl git
RUN curl https://install.meteor.com/ | sh

# Download meteor app (since buggy, use microscope for now)
RUN git clone https://github.com/DiscoverMeteor/Microscope.git home/app
RUN git clone https://bitbucket.org/tadf/web.git home/app
RUN git clonehttps://@bitbucket.org/tadf/mobile.githome/app
# # RUN git clone  home/app
RUN git clone     home/app

# Move to app directory
WORKDIR /home/app

# Start app as entrypoint
ENTRYPOINT ["meteor"]
