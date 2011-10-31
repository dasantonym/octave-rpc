function res = rpc(json)
  addpath([pwd() '/vendor/rpc/jsonlab']);
  addpath([pwd() '/functions']);

  req = loadjson(json);

  try
    _ = req.version;
  catch
    req.version = "1.1";
  end

  try
    _ = req.id;
  catch
    req.id = "1";
  end

  res = savejson('res', struct( ...
    'result', pack(apply(req.method, req.params)), ...
    'version', req.version, ...
    'id', req.id ...
  ));

end
