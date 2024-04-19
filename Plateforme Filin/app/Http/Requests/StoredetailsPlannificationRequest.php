<?php

namespace App\Http\Requests\V2;

use Illuminate\Foundation\Http\FormRequest;

class StoredetailsPlannificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "Kg_standard"=>["required"] ,
            "titre"=>["required"] ,          
            "banc"=>["required"] ,
            "metier"=>["required"] ,
            "recette"=>["required"] ,
            "client"=>["required"] ,
            "observation"=>["required"] 
        ];
    }
}
