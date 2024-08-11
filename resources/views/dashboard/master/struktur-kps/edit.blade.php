@extends('layouts.app')
@section('content')

@pushOnce('css')
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/datatables.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/sweetalert2.css') }}">
<!-- Summernote css -->
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/select2.css') }}">
@endPushOnce


<div class="page-body">
  <div class="container-fluid">
    <div class="page-header">
      <div class="row">
        <div class="col-sm-6">
          <h3>Edit Struktur Kepemimpinan</h3>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Applications</a></li>
            <li class="breadcrumb-item">Data Pengguna</li>
            <li class="breadcrumb-item active">Edit Struktur Kepemimpinan</li>
          </ol>
        </div>
        <div class="col-sm-6">
          <!-- Bookmark Start-->
          <div class="bookmark">
            <ul>
              <li><a href="javascript:void(0)" data-container="body" data-bs-toggle="popover" data-placement="top"
                  title="" data-original-title="Tables"><i data-feather="inbox"></i></a></li>
              <li><a href="javascript:void(0)" data-container="body" data-bs-toggle="popover" data-placement="top"
                  title="" data-original-title="Chat"><i data-feather="message-square"></i></a></li>
              <li><a href="javascript:void(0)" data-container="body" data-bs-toggle="popover" data-placement="top"
                  title="" data-original-title="Icons"><i data-feather="command"></i></a></li>
              <li><a href="javascript:void(0)" data-container="body" data-bs-toggle="popover" data-placement="top"
                  title="" data-original-title="Learning"><i data-feather="layers"></i></a></li>
              <li><a href="javascript:void(0)"><i class="bookmark-search" data-feather="star"></i></a>
                <form class="form-inline search-form">
                  <div class="form-group form-control-search">
                    <input type="text" placeholder="Search..">
                  </div>
                </form>
              </li>
            </ul>
          </div>
          <!-- Bookmark Ends-->
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <div class="col-lg-12">
              <div class="card p-3">
                <form method="POST" class="needs-validation" novalidate=""
                  action="{{ route('struktur-kps.update', [$data]) }}" enctype="multipart/form-data">
                  @csrf
                  @method('POST')
                  @if ($errors->any())
                  <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                      <use xlink:href="#exclamation-triangle-fill" />
                    </svg>
                    <ul>
                      @foreach ($errors->all() as $error)
                      <li>{{ $error }}</li>
                      @endforeach
                    </ul>
                  </div>
                  @endif
                  <div class="row">
                    <div class="col-md-8">
                      <div class="mb-3">
                        <label for="name" class="form-label">Nama</label>
                        <input type="text" class="form-control" name="name" id="name" required
                          value="{{ old('name', $data->name) }}">
                      </div>
                      <div class="mb-3">
                        <label for="description" class="form-label">Keterangan</label>
                        <textarea class="form-control" name="description"
                          id="description">{{ old('description', $data->description) }}</textarea>
                        <small class="text-muted d-block mt-1">Boleh kosong, jika di-isi maka keterangan digunakan di
                          bawah nama.</small>
                      </div>
                      <div class="mb-3">
                        <label class="col-form-label" for="jabatan_id">Jabatan</label>
                        <select class="js-example-basic-single col-sm-12" name="jabatan_id" id="jabatan_id">
                          @foreach ($jabatans as $jabatan)
                          <option @selected($jabatan->id == old("jabatan_id", $data->jabatan_id)) value="{{ $jabatan->id
                            }}">{{
                            $jabatan->name }}</option>
                          @endforeach
                        </select>
                      </div>
                      <div class="mb-3">
                        <div class="row">
                          <div class="col-sm-4">
                            <img src="{{ asset('storage/' . $data->pas_foto) }}" alt="" class="w-100 img-thumbnail">
                          </div>
                          <div class="col-sm-8">
                            <label for="pas_foto" class="form-label">Pas Foto</label>
                            <input type="file" class="form-control" name="pas_foto" id="pas_foto" required>
                            <small class="text-muted">Wajib berbentuk file gambar seperti .jpg, .jpeg, .png, .gif atau
                              sejenisnya dan maksimal ukuran file 5MB.</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary mt-4">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

@push('js')
<script src="{{ asset('assets/js/select2/select2.full.min.js') }}"></script>
<script src="{{ asset('assets/js/select2/select2-custom.js') }}"></script>
@endpush