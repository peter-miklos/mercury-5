Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    scope '/v1' do
      scope '/products' do
        get '/' => 'api#index'
      end
      scope '/product' do
        post '/' => 'api#create'
        scope '/:product_id' do
          get '/' => 'api#show'
          put '/' =>'api#update'
          delete '/' => 'api#destroy'
        end
      end
    end
  end

end
