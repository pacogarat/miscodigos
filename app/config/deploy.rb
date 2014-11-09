set :application, "miscodigos"
set :domain,      "pacogarat.com"
set :deploy_to,   "/var/www/miscodigos"
set :app_path,    "app"


set :user,        "pacogarat"
set :use_sudo,     false

set :use_composer, true
set :update_vendors, true

default_run_options[:pty] = true

set :repository,  "git@github.com:pacogarat/miscodigos.git"
set :scm,         :git
set :branch,      "master"
set :deploy_via,  :remote_cache

after "deploy",   "deploy:cleanup"

set :model_manager, "doctrine"

role :web,        domain                         # Your HTTP server, Apache/etc
role :app,        domain, :primary => true       # This may be the same as your `Web` server

set :writable_dirs,     ["app/cache", "app/logs"]
set  :keep_releases,  3
set :shared_files,      ["app/config/parameters.yml"]
set :shared_children,   [app_path + "/logs", web_path + "/uploads", "vendor"]

logger.level = Logger::MAX_LEVEL