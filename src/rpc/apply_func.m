function varargout = apply_func (fxn, args)
  varargout = { feval(fxn, args) };
endfunction
