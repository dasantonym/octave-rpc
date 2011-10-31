function varargout = call (fxn, xs)
  varargout = num2cell(feval(fxn, unpack(num2cell(xs))));
end
