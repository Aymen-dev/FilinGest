<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatemarqueMachineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method=$this->method();
        if($method== 'PUT'){
            return [
                'nom_marque'=>['required']
            ];
        }else{
            return [
                'nom_marque'=>['sometimes','required']
            ];
        }
    }
}