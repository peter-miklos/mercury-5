class CatchAllController < ApplicationController
  def index
    render json: { error: 'Not Found', url: request.url, status: 404 }, status: :not_found
  end
end
